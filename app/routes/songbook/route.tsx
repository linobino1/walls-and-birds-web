import classes from "./index.module.css";
import { Link, Outlet } from "@remix-run/react";
import Layout from "~/components/Layout";

export default function Songbook() {
  return (
    <Layout type="white" className={classes.container}>
      <Link to="/songbook">
        <h1>
          <div>the</div>
          <div>Walls & Birds</div>
          <div>songbook</div>
        </h1>
      </Link>

      <Outlet />
    </Layout>
  );
}
