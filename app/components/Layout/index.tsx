import { NavLink, useLocation } from "@remix-run/react";
import classes from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: "black" | "white";
  noFooter?: boolean;
}

export const Layout: React.FC<Props> = ({
  type = "black",
  children,
  ...props
}) => {
  const { pathname } = useLocation();
  return (
    <div
      className={classes.container}
      data-layout-type={type ?? "black"}
      data-layout-center={pathname === "/"}
    >
      <main {...props}>{children}</main>
      {!props.noFooter && (
        <footer>
          <NavLink prefetch="intent" to="/legal">
            legal notice
          </NavLink>
          {pathname === "/" && (
            <NavLink prefetch="intent" to="/past-shows">
              past shows
            </NavLink>
          )}
        </footer>
      )}
    </div>
  );
};

export default Layout;
