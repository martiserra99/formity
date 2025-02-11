import type { ReactNode } from "react";

interface LayoutProps {
  heading: string;
  description: string;
  fields: ReactNode[];
  button: ReactNode;
  back?: ReactNode;
}

export default function Layout({
  heading,
  description,
  fields,
  button,
  back,
}: LayoutProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-md shrink-0">
        <h1
          data-cy="heading"
          className="mb-3 text-center text-3xl font-medium text-white"
        >
          {heading}
        </h1>
        <p className="mb-6 text-center text-base text-neutral-500">
          {description}
        </p>
        <div className="scrollbar-hide mb-4 max-h-96 overflow-auto">
          <div className="space-y-4 pt-2">{fields}</div>
        </div>
        {button}
      </div>
      {back && <div className="absolute left-4 top-5">{back}</div>}
    </div>
  );
}
