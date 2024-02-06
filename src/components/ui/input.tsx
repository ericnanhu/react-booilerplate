"use client";

type InputProps = {
  type: string;
  className?: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ type, className, ...props }: InputProps) {
  return (
    <>
      {type === "text" && (
        <input
          type="text"
          className={
            "border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:text-dark transition-all duration-150 text-sm p-2" +
            " " +
            className
          }
          {...props}
        />
      )}
      {type === "email" && (
        <input
          type="email"
          className={
            "border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:text-dark transition-all duration-150 text-sm p-2" +
            " " +
            className
          }
          {...props}
        />
      )}
    </>
  );
}
