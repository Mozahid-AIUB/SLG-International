/**
 * Sets the division accent for everything beneath /engineering. Components
 * read `--accent`; none of them know which division they are rendering under.
 */
export default function EngineeringLayout({ children }: LayoutProps<"/engineering">) {
  return (
    <div data-division="engineering" className="contents">
      {children}
    </div>
  );
}
