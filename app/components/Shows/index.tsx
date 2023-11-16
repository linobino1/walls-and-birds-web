import type { PaginatedDocs } from "payload/database";
import type { Show } from "payload/generated-types";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  shows: PaginatedDocs<Show>;
}

export const Shows: React.FC<Props> = ({ shows, ...props }) => (
  <ul {...props}>
    {shows.totalDocs > 0 ? (
      shows.docs.map((show, i) => <ShowComponent key={i} show={show} />)
    ) : (
      <li>no upcoming shows</li>
    )}
  </ul>
);

const ShowComponent: React.FC<{ show: Show }> = ({ show }) => {
  const label = `${format(new Date(show.date), "PP", { locale: enUS })} | ${
    show.location
  }`;
  return (
    <li>
      {show.link ? (
        <Link target="_blank" rel="noopener noreferrer" to={show.link}>
          {label}
        </Link>
      ) : (
        <span>{label}</span>
      )}
    </li>
  );
};
