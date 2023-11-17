import { json, type LoaderFunctionArgs } from "@remix-run/node";
import Layout from "~/components/Layout";
import classes from "./index.module.css";
import { PressText } from "~/components/PressText";
import PressPhoto from "~/components/PressPhoto";
import { useLoaderData } from "@remix-run/react";
import type { PressPhoto as PressPhotoType } from "payload/generated-types";

export const loader = async ({ context: { payload } }: LoaderFunctionArgs) => {
  const info = await payload.findGlobal({
    slug: "info",
    depth: 2,
  });

  return json({ info }, { status: 200 });
};

export default function Info() {
  const { info } = useLoaderData<typeof loader>();
  return (
    <Layout type="white" className={classes.container}>
      <h1>
        <div>Walls & Birds</div>
        <div>Press Info</div>
      </h1>

      <section>
        <h2>Info</h2>
        <PressText>
          Walls & Birds is a german pop group. Their self-released tapes
          “Daytona Beach” (2015) and “Fitness Lady Wellness” (2017) gained
          critical acclaim in the mid 2010s eventually leading to a devoted
          fanbase worldwide. Their enigmatic and often extraordinary liveshows
          conjoining poetry, humour, seriousness and amusement, make them lovely
          to everyone who can let go into this kind of (atmo-)sphere.
        </PressText>
        <ul>
          <li>
            web:{" "}
            <a
              href="https://wallsandbirds.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              wallsandbirds.com
            </a>
          </li>
          <li>
            bandcamp:{" "}
            <a
              href="https://wallsandbirds.bandcamp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              wallsandbirds.bandcamp.com
            </a>
          </li>
          <li>
            youtube:{" "}
            <a
              href="https://www.youtube.com/@wallsandbirds"
              target="_blank"
              rel="noopener noreferrer"
            >
              youtube.com/@wallsandbirds
            </a>
          </li>
          <li>instagram: not available</li>
          <li>
            label:{" "}
            <a
              href="https://beatbude.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              beatbude.com
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Contact & Booking</h2>
        <ul>
          <li>
            <a href="mailto:judy@wallsandbirds.com">judy@wallsandbirds.com</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Latest Release ”Less than a kilometer away”</h2>
        <p>release date: July 21st, 2023</p>
        <ul>
          <li>
            <a
              href="https://www.youtube.com/playlist?list=PLqoBupXjXKWNH5gI9MfMJUt8sXxdtZ4I5"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.youtube.com/playlist?list=PLqoBupXjXKWNH5gI9MfMJUt8sXxdtZ4I5
            </a>
          </li>
          <li>
            download:{" "}
            <a
              href="http://cloud.wallsandbirds.com/index.php/s/Zjkpiifc5Rt2fKf"
              target="_blank"
              rel="noopener noreferrer"
            >
              wav or mp3
            </a>
          </li>
        </ul>
        <h3>Press Release (short)</h3>
        <PressText>
          2023: Walls & Birds is coming back with a new record on the Berlin
          record label Beatbude. The two song vinyl release with a limited first
          edition of 300 copies is accompanied by a digital bonus track and a
          consecutive music video. Join in for news and shows at{" "}
          <a
            href="https://wallsandbirds.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            wallsandbirds.com
          </a>
          .
        </PressText>
        <h3>Press Release (long)</h3>
        <PressText>
          2023: Walls & Birds is coming back with a new record on the berlin
          record label Beatbude. Much like their previous releases, ”Less than a
          kilometer away” is Walls & Birds new take on popular music today.
          Recorded with the aid of ”The Whitest Boy Alive” keyboarder Daniel
          Nentwig at the local Butterama Recording Center, the three song
          release features a limited edition of 300 7" vinyl copies, a fold-out
          poster and a consecutive music video. The first song ”Wearing a dress”
          touches on the theme of modern clothing habits, while questioning
          relationship patterns still widespread in popular music lyrics. The
          surprising element of new found love is also one of the themes of the
          B-side “heads || tales ? '❤️'“ telling the story of a late night after
          work taxi ride with the chorus contemplating about the eternal either
          or question, plainly answered with: love. The cheerful upbeat digital
          bonus track ”Summer 2002” is as meaningless as most any nice pop song
          to date. Walls & Birds are known for their smooth and dreamy yet
          amiable approach to both instruments and audience, a combination of
          poetry, humour, seriousness and amusement, which makes them lovely to
          everyone who can let go into this kind of (atmo-)sphere.
        </PressText>
      </section>

      <section>
        <h2>Photos</h2>
        {info.photos?.map((photo) => (
          <PressPhoto key={photo.id} image={photo.photo as PressPhotoType} />
        ))}
      </section>
    </Layout>
  );
}
