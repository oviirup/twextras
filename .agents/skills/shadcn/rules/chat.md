# Chat & Messaging

Components for conversation/chat UI. Compose these instead of hand-rolling bubbles, scroll containers, dividers, attachment cards.

Install: `npx shadcn@latest add message-scroller message bubble attachment marker trace code-block`

Same component names + props ship for `base` and `radix`; only composition differs (`render` vs `asChild`). See [base-vs-radix.md](./base-vs-radix.md).

## Contents

- Scrollable threads use MessageScroller
- Message rows use Message
- Message surfaces use Bubble
- Attachments use Attachment
- System notes and dividers use Marker
- Assistant activity uses Trace
- Code and tool output use CodeBlock
- Streaming, anchoring, jump-to-latest built in
- Escape hatch: scroller hooks

---

## Scrollable threads use MessageScroller

Conversation that scrolls, follows new messages, restores position, or jumps to message → `MessageScroller`. No raw overflow container + manual scroll wiring, no `ScrollArea`.

Parts nest fixed order. Every direct child of content wrapped in `MessageScrollerItem` so scroller can measure, anchor, preserve position, track visibility, jump to it. `MessageScrollerButton` inside `MessageScroller`, after viewport.

**Incorrect:**

```tsx
// Hand-rolled scroll container with manual stick-to-bottom logic.
<div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
  <div className="flex flex-col gap-6 p-4">
    {messages.map((m) => (
      <ChatMessage key={m.id} message={m} />
    ))}
  </div>
</div>;
```

**Correct:**

```tsx
<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        {messages.map((message) => (
          <MessageScrollerItem
            key={message.id}
            messageId={message.id}
            scrollAnchor={message.role === "user"}>
            <Message align={message.role === "user" ? "end" : "start"}>
              {/* ...message content... */}
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>;
```

---

## Message rows use Message

`Message` lays out single row: avatar, header, content, footer, alignment. Group consecutive same-sender rows with `MessageGroup`. No row rebuilt from flex divs.

`align="end"` = current user; `align="start"` = everyone else.

```tsx
<Message align="start">
  <MessageAvatar>
    <Avatar>
      <AvatarImage src={sender.avatar} alt={sender.name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>{sender.name}</MessageHeader>
    <Bubble>
      <BubbleContent>{text}</BubbleContent>
    </Bubble>
    <MessageFooter>{time}</MessageFooter>
  </MessageContent>
</Message>;
```

---

## Message surfaces use Bubble

Colored message surface = `Bubble` + `BubbleContent`, never styled `div` with `bg-muted`/`bg-primary` + hand-managed corners.

- `variant`: `default`, `secondary`, `muted`, `tinted`, `outline`, `ghost`, `destructive`.
- `align`: `start`/`end` (matches `Message` side).

`BubbleReactions` renders reaction cluster. `side` (`top`|`bottom`) + `align` (`start`|`end`) position against bubble. No absolutely-positioned `Badge`s.

**Incorrect:**

```tsx
<div className="w-fit rounded-2xl bg-primary px-3 py-2 text-primary-foreground">{text}</div>;
```

**Correct:**

```tsx
<Bubble variant="default" align="end">
  <BubbleContent>{text}</BubbleContent>
  <BubbleReactions side="bottom" align="end">
    <Badge variant="secondary">👍 2</Badge>
  </BubbleReactions>
</Bubble>;
```

---

## Attachments use Attachment

File/image attachments → `Attachment`, not `Item`/custom card. Carries upload state — wire `state` to real status, no separate spinner.

- `state`: `idle`, `uploading`, `processing`, `error`, `done`. `uploading`/`processing` auto-apply `shimmer` to title.
- `size`: `default`, `sm`, `xs`. `orientation`: `horizontal`, `vertical`.
- `AttachmentGroup` lays out several in scrolling row.

```tsx
<Attachment state="done">
  <AttachmentMedia variant="icon">
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>homepage-feedback.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction>
      <DownloadIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>;
```

Image → `<AttachmentMedia variant="image">` with `img` child.

---

## System notes and dividers use Marker

Status lines ("Sarah joined"), date dividers ("Today"), labeled separators → `Marker`, not `Separator` + centered span.

- `variant`: `default` (plain row), `separator` (centered label + rules each side), `border` (bottom-bordered row).
- `MarkerIcon` = leading icon; `MarkerContent` = label.

**Incorrect:**

```tsx
<div className="flex items-center gap-3 py-2">
  <Separator className="flex-1" />
  <span className="text-xs text-muted-foreground">Today</span>
  <Separator className="flex-1" />
</div>;
```

**Correct:**

```tsx
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>;
```

---

## Assistant activity uses Trace

What assistant did/is doing (reasoning, tool calls, chain of thought, steps, sources, file reads) = `TraceLine` in `Trace`, not hand-rolled `Collapsible`/`Marker`. One line = one thing; may have detail.

- `TraceLine` always the line: `TraceIcon` + `TraceTitle`, optional `TraceDescription` (count, duration, diff stat). `status` on `TraceLine`. Never hand-roll span for secondary text.
- Behavior wraps the line. Line does something → wrap in that thing's trigger:
  - nothing to open: `TraceLine` alone;
  - expands: `TraceCollapsible` > `TraceCollapsibleTrigger` > `TraceLine`, then `TraceCollapsibleContent`. Trigger adds own chevron;
  - link: `<a href>` > `TraceLine`;
  - overlay: `<SheetTrigger>` > `TraceLine` (Dialog, Drawer, Popover same). Aria: `<DialogTrigger><Button>` > `TraceLine`, React Aria `Button`.
- Never make line the trigger: no `asChild`/`render={<TraceLine />}` on trigger. Trigger must stay real button.
- `TraceCollapsibleTrigger` always has `TraceCollapsibleContent`. Tool row = `TraceLine` until output arrives, then `TraceCollapsible`.
- Rows from message parts → one `Trace` per run of parts. Text part or pending approval ends run. Heading for run = plain text above it, or collapsible summary row.
- Pending approval (`approval-requested`) = prompt, not row. Render outside `Trace` as `Item` with Approve/Deny in `ItemActions`. See /docs/ai-elements/base/confirmation. Once answered, tool part = line again.
- Summary (sources, task, whole turn) = `TraceCollapsible` whose `TraceCollapsibleContent` holds `Trace`. Set parent line's status + title from children yourself.
- `status` = `"running"`, `"error"` or `"pending"` (plan step not started), or omitted. Words agree: Running, Ran, Failed to run. Never dim line `opacity-*`. Map SDK states yourself; never pass through.
- Trailing `TraceIcon` only for link (arrow-up-right new tab, + sr-only " (opens in a new tab)" in `TraceTitle`) or overlay (chevron-right).
- Open state on `TraceCollapsible`: `defaultOpen`, or `open` + `onOpenChange` (aria: `defaultExpanded`, or `isExpanded` + `onExpandedChange`).
- `Marker` for notes/dividers between turns, not activity.
- Checkpoint marks turn reader can return to: `Marker` separator after that message, `Button` calls `setMessages` with messages up to + including it. See /docs/ai-elements/base/checkpoint.
- Folder of files = nested `Collapsible`s, one folder per row, file = `Button`. See /docs/ai-elements/base/file-tree. Single file assistant read = still `TraceLine`.
- Person's turn = `Message` `align="end"` + `Bubble`. Assistant's answer = `Message`. See /docs/ai-elements/base/message.
- Thread = turns in `MessageScroller`. Person's turn = `scrollAnchor`, `autoScroll` follows reply. See /docs/ai-elements/base/chat.
- Prompt = `InputGroup`: textarea, attachment chip, submit button. See /docs/ai-elements/base/prompt-input.
- Suggestion = `Button` sending label via `sendMessage({ text })`. See /docs/ai-elements/base/suggestion.
- Model picker = `DropdownMenu` + `DropdownMenuRadioGroup`, second one for effort. Send selected ids on `sendMessage` as `body.model` + `body.effort`. See /docs/ai-elements/base/model-selector.
- Inline citation = `HoverCard` on short `Button` in sentence, from `source-url` part. See /docs/ai-elements/base/inline-citation. Sources list after answer = still Sources.
- Context usage = `HoverCard` + `Progress`, from message metadata `usage`. Window size = model's limit. See /docs/ai-elements/base/context.
- Asked for AI Elements component (Tool, Reasoning, Chain of Thought, Task, Plan, Sources, Subagent)? Component page built with Trace (e.g. /docs/ai-elements/base/tool). Install `trace`, copy composition. Message = one turn (/docs/ai-elements/base/message). Chat = thread in Message Scroller (/docs/ai-elements/base/chat). Checkpoint = Marker (/docs/ai-elements/base/checkpoint). File Tree = nested Collapsibles (/docs/ai-elements/base/file-tree). Confirmation = Item (/docs/ai-elements/base/confirmation). Prompt Input = Input Group (/docs/ai-elements/base/prompt-input). Suggestion = Button (/docs/ai-elements/base/suggestion). Model Selector = Dropdown Menu (/docs/ai-elements/base/model-selector). Inline Citation = Hover Card (/docs/ai-elements/base/inline-citation). Context = Hover Card + Progress (/docs/ai-elements/base/context).

**Incorrect:**

```tsx
const [open, setOpen] = useState(true)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger className="text-sm text-muted-foreground">
    {isStreaming ? "Thinking..." : "Thought for a few seconds"}
  </CollapsibleTrigger>
  <CollapsibleContent>{part.text}</CollapsibleContent>
</Collapsible>
```

**Correct:**

```tsx
<TraceCollapsible>
  <TraceCollapsibleTrigger>
    <TraceLine status={running ? "running" : undefined}>
      <TraceIcon>
        <BrainIcon />
      </TraceIcon>
      <TraceTitle>{running ? "Thinking" : "Thought"}</TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>{part.text}</TraceCollapsibleContent>
</TraceCollapsible>;
```

**Incorrect:** tool row whose output may not exist yet.

```tsx
<TraceCollapsible>
  <TraceCollapsibleTrigger>
    <TraceLine status={status}>…</TraceLine>
  </TraceCollapsibleTrigger>
  {output && <TraceCollapsibleContent>{output}</TraceCollapsibleContent>}
</TraceCollapsible>;
```

**Correct:** `TraceLine` until something to open.

```tsx
function ToolRow({
  icon,
  title,
  status,
  output,
}: {
  icon: React.ReactNode;
  title: string;
  status?: "running" | "error";
  output?: string;
}) {
  const line = (
    <TraceLine status={status}>
      <TraceIcon>{icon}</TraceIcon>
      <TraceTitle>{title}</TraceTitle>
    </TraceLine>
  );

  if (output === undefined) {
    return line;
  }

  return (
    <TraceCollapsible>
      <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <CodeBlock size="sm">
          <CodeBlockContent wrap className="max-h-64">
            {output}
          </CodeBlockContent>
        </CodeBlock>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  );
}
```

**Incorrect:** trigger renders as line → span.

```tsx
<Sheet>
  <SheetTrigger asChild>
    <TraceLine>…</TraceLine>
  </SheetTrigger>
</Sheet>;
```

**Correct:** sources, each link wrapping own line.

```tsx
<TraceCollapsible>
  <TraceCollapsibleTrigger>
    <TraceLine>
      <TraceIcon>
        <GlobeIcon />
      </TraceIcon>
      <TraceTitle>Used {sources.length} sources</TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>
    <Trace>
      {sources.map((source) => (
        <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
          <TraceLine>
            <TraceIcon>
              <GlobeIcon />
            </TraceIcon>
            <TraceTitle>
              {source.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </TraceTitle>
            <TraceIcon>
              <ArrowUpRightIcon />
            </TraceIcon>
          </TraceLine>
        </a>
      ))}
    </Trace>
  </TraceCollapsibleContent>
</TraceCollapsible>;
```

---

## Code and tool output use CodeBlock

Code, terminal output, tool input/output, logs, stack traces, diffs → `CodeBlock`, never hand-rolled `<pre>`.

- `CodeBlockContent` takes string. `wrap` for tool output/errors, `lineNumbers` for source, `max-h-*` caps height.
- Errors → `variant="destructive"` on `CodeBlock`. Don't recolor block.
- Diffs/highlighted lines → map each line to `CodeBlockLine` with `variant="added"`/`"removed"`/`"highlighted"`.
- `CodeBlockCopyButton` takes text to copy as `value`.
- Output inside Trace row → `size="sm"` + `wrap` + `max-h-64`: wraps + scrolls inside row. Docs, Markdown fences, chat answers → default size.
- Header buttons → `CodeBlockActions`. No header → `CodeBlockActions` directly in `CodeBlock`; floats, shows on hover.
- `code-block` installs `use-highlighted-code`. Source code → map lines of `useHighlightedCode(code, language)` into `CodeBlockLine`. Server Component → `await highlightCode(code, language)`. Don't highlight tool output; pass string.
- `startLine` numbers snippet from middle of file.

**Incorrect:**

```tsx
<pre className="rounded-md bg-muted p-3 font-mono text-xs whitespace-pre-wrap">{output}</pre>;
```

**Correct:**

```tsx
<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>Output</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton value={output} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent wrap className="max-h-72">
    {output}
  </CodeBlockContent>
</CodeBlock>;
```

---

## Streaming, anchoring, jump-to-latest built in

`MessageScroller` handles behavior chat UIs usually reinvent. No `useStickToBottom` hook, `ResizeObserver`, manual `scrollTop` math.

- **Follow live edge while streaming.** `MessageScrollerProvider` + `autoScroll` pins view to new content, yields when user scrolls up. Streaming token updates growing last message followed automatically.
- **Anchor a turn.** `scrollAnchor` on `MessageScrollerItem` marks row to hold in view (typically user's message starting turn).
- **Jump to latest.** `MessageScrollerButton` appears when user scrolls away, scrolls back on click. `direction="end"` (default)/`"start"`. Self-managing — don't gate behind own scroll-position state.
- **Open saved transcript without flash.** `defaultScrollPosition` applies after mount. `"end"`/`"last-anchor"` → viewport has `data-pending-scroll` till applied; styled viewport hides. `"end"` on first paint with messages in server HTML → copy script into page, not primitive. Skip for `"last-anchor"` + client-fetched messages. Keep `suppressHydrationWarning` on viewport. Pass `nonce` with CSP.

```tsx
const scrollToEndScript = `(function () {
  var viewport = document.getElementById("messages")
  if (!viewport) {
    return
  }
  viewport.scrollTop = viewport.scrollHeight
  viewport.removeAttribute("data-pending-scroll")
})()`

<MessageScroller>
  <MessageScrollerViewport id="messages" suppressHydrationWarning>
    <MessageScrollerContent>{/* transcript */}</MessageScrollerContent>
  </MessageScrollerViewport>
  <script dangerouslySetInnerHTML={{ __html: scrollToEndScript }} />
  <MessageScrollerButton />
</MessageScroller>
```

"Thinking…" indicator while model generates → `shimmer` utility on text. No custom keyframes. See [styling.md](./styling.md).

---

## Escape hatch: scroller hooks

Behavior parts don't expose → read state from hooks, don't re-implement scroller: `useMessageScroller`, `useMessageScrollerVisibility`, `useMessageScrollerScrollable`. From auto-installed `@shadcn/react` dep — nothing extra to install. Only when composition can't express need.
