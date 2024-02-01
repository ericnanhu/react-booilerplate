"use client";

type ButtonProps = {
  color: string;
  children: React.ReactNode;
  loading: boolean;
  className?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "submit" | "reset" | "button" | undefined;
};

export default function Button({
  color,
  children,
  loading,
  className,
  onClick,
  type,
}: ButtonProps) {
  return (
    <>
      {color === "primary" && loading === true && (
        <button
          className={
            "border-2  border-primary bg-primary hover:border-primary-dark hover:bg-primary-dark focus:border-primary-darker focus:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-light transition-all duration-150 text-light text-sm font-semibold rounded-md px-4 py-2" +
            " " +
            className
          }
          onClick={onClick}
          type={type}
          disabled>
          <svg
            className="stroke-light fill-light animate-spin inline mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
          </svg>
          {children}
        </button>
      )}
      {color === "primary" && loading === false && (
        <button
          className={
            "border-2  border-primary bg-primary hover:border-primary-dark hover:bg-primary-dark focus:border-primary-darker focus:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-light transition-all duration-150 text-light text-sm font-semibold rounded-md px-4 py-2" +
            " " +
            className
          }
          onClick={onClick}
          type={type}>
          {children}
        </button>
      )}
      {color === "primary-bordered" && loading === true && (
        <button
          className={
            "border-2 border-primary transition-all duration-150 text-primary text-sm font-semibold rounded-md px-4 py-2" +
            " " +
            className
          }
          onClick={onClick}
          type={type}
          disabled>
          <svg
            className="stroke-primary fill-primary animate-spin inline mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
          </svg>
          {children}
        </button>
      )}
      {color === "primary-bordered" && loading === false && (
        <button
          className={
            "border-2 border-primary hover:bg-primary focus:border-primary-darker focus:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-light transition-all duration-150 text-primary hover:text-light focus:text-light text-sm font-semibold rounded-md px-4 py-2" +
            " " +
            className
          }
          onClick={onClick}
          type={type}>
          {children}
        </button>
      )}
      {color === "danger" && loading === true && (
        <button
          className={
            "border-2 border-danger bg-danger hover:border-danger-dark hover:bg-danger-dark focus:border-danger-darker focus:bg-danger-darker focus:outline-none focus:ring focus:ring-danger-light transition-all duration-150 text-light text-sm font-semibold rounded-md px-4 py-2" +
            " " +
            className
          }
          onClick={onClick}
          type={type}
          disabled>
          <svg
            className="stroke-light fill-light animate-spin inline mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
          </svg>
          {children}
        </button>
      )}
      {color === "danger" && loading === false && (
        <button
          className={
            "border-2 border-danger bg-danger hover:border-danger-dark hover:bg-danger-dark focus:border-danger-darker focus:bg-danger-darker focus:outline-none focus:ring focus:ring-danger-light transition-all duration-150 text-light text-sm font-semibold rounded-md px-4 py-2" +
            " " +
            className
          }
          onClick={onClick}
          type={type}>
          {children}
        </button>
      )}
      {color === "danger-bordered" && loading === true && (
        <button
          className="border-2 border-danger transition-all duration-150 text-danger text-sm font-semibold rounded-md px-4 py-2"
          onClick={onClick}
          type={type}
          disabled>
          <svg
            className="stroke-danger fill-danger animate-spin inline mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
          </svg>
          {children}
        </button>
      )}
      {color === "danger-bordered" && loading === false && (
        <button
          className="border-2 border-danger hover:bg-danger focus:border-danger-darker focus:bg-danger-darker focus:outline-none focus:ring focus:ring-danger-light transition-all duration-150 text-danger hover:text-light focus:text-light text-sm font-semibold rounded-md px-4 py-2"
          onClick={onClick}
          type={type}>
          {children}
        </button>
      )}
    </>
  );
}
