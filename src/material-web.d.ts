import type { DetailedHTMLProps, HTMLAttributes } from "react";

// Minimal JSX typings for the Material Web custom elements we use.
// React 19 renders unknown lowercase tags as custom elements; these
// declarations just keep TypeScript happy and give us a few common attrs.
type MdProps<Extra = object> = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & Extra,
  HTMLElement
>;

type ButtonProps = MdProps<{
  href?: string;
  target?: string;
  disabled?: boolean;
  trailingicon?: boolean;
}>;

type ChipProps = MdProps<{
  label?: string;
  href?: string;
  target?: string;
  selected?: boolean;
  elevated?: boolean;
}>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "md-filled-button": ButtonProps;
      "md-filled-tonal-button": ButtonProps;
      "md-outlined-button": ButtonProps;
      "md-text-button": ButtonProps;
      "md-elevated-button": ButtonProps;
      "md-icon-button": MdProps<{
        href?: string;
        target?: string;
        toggle?: boolean;
        selected?: boolean;
      }>;
      "md-fab": MdProps<{ label?: string; size?: string; variant?: string }>;
      "md-branded-fab": MdProps<{ label?: string; size?: string }>;
      "md-icon": MdProps<{ slot?: string }>;
      "md-chip-set": MdProps;
      "md-assist-chip": ChipProps;
      "md-filter-chip": ChipProps;
      "md-suggestion-chip": ChipProps;
      "md-divider": MdProps<{ inset?: boolean }>;
      "md-elevation": MdProps;
      "md-ripple": MdProps;
      "md-linear-progress": MdProps<{
        value?: number;
        max?: number;
        indeterminate?: boolean;
      }>;
      "md-list": MdProps;
      "md-list-item": MdProps<{
        href?: string;
        target?: string;
        type?: string;
      }>;
      "md-switch": MdProps<{ selected?: boolean; icons?: boolean }>;
    }
  }
}
