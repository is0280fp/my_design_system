// index.jsx
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";

const CustomedPopover = () => (
  <Popover.Root>
    <Popover.Trigger>More info</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content>
        Some more info…
        <Popover.Arrow />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default CustomedPopover;
