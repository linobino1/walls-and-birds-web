import { NavLink } from "@remix-run/react";
import classes from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: "black" | "white";
  noFooter?: boolean;
}

export const Layout: React.FC<Props> = ({ type, children, ...props }) => {
  return (
    <div className={classes.container} data-layout-type={type ?? "black"}>
      <main {...props}>{children}</main>
      {!props.noFooter && (
        <footer>
          <NavLink to="/legal">legal notice</NavLink>
          <NavLink to="/faq" prefetch="intent">
            faq
          </NavLink>
        </footer>
      )}
    </div>
  );
};

export default Layout;
