import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./PlaqueButton.module.css";

type Variant = "primary" | "secondary" | "quiet";

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type PlaqueButtonProps = LinkProps | ButtonProps;

export default function PlaqueButton({
  variant = "primary",
  className = "",
  ...props
}: PlaqueButtonProps) {
  const classes = `${styles.plaque} ${styles[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as LinkProps;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {props.children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonProps;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {props.children}
    </button>
  );
}
