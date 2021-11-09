import { DetailedHTMLProps, HTMLAttributes } from "react";

export type HTMLElementAttributes <Element extends HTMLElement> = DetailedHTMLProps<HTMLAttributes<Element>, Element>