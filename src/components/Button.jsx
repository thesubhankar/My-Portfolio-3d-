import React, { useRef, useEffect } from 'react';
import { buttonMagneticHover } from '../animations/gsapAnimations';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  target,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  download,
  ...props
}) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const cleanup = buttonMagneticHover(el);
    return cleanup;
  }, []);

  const baseStyles = "inline-flex items-center justify-center font-medium font-mono transition-all duration-300 rounded-lg select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 active:scale-95";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5"
  }[size];

  const variantStyles = {
    primary: "bg-neon-pink text-white hover:bg-neon-pink/90 hover:shadow-neon-pink focus:ring-neon-pink border border-neon-pink",
    secondary: "bg-dark-800 text-neon-cyan border border-neon-cyan/40 hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-neon-cyan focus:ring-neon-cyan",
    cyan: "bg-neon-cyan text-dark-950 font-semibold hover:bg-neon-cyan/90 hover:shadow-neon-cyan focus:ring-neon-cyan border border-neon-cyan",
    outline: "bg-transparent text-slate-200 border border-slate-700 hover:border-slate-400 hover:text-white hover:bg-white/5 focus:ring-slate-400",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-dark-800 focus:ring-slate-500",
  }[variant];

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="text-base shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="text-base shrink-0" />}
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        download={download}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
