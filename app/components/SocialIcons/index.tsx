import classes from "./index.module.css";

const items = [
  {
    name: "bandcamp",
    url: "https://wallsandbirds.bandcamp.com",
    icon: "/img/bandcamp.svg",
  },
  {
    name: "soundcloud",
    url: "https://soundcloud.com/wallsandbirds",
    icon: "/img/soundcloud.svg",
  },
  {
    name: "youtube",
    url: "https://www.youtube.com/@wallsandbirds",
    icon: "/img/youtube.svg",
  },
  {
    name: "spotify",
    url: "https://open.spotify.com/artist/1JsIvsuQmlAAxBnzIcb9m1?si=59gGEE2jTPmy6h7JG1VvqQ",
    icon: "/img/spotify.svg",
  },
  {
    name: "youtube music",
    url: "https://music.youtube.com/channel/UCxPtZaLECUA8F9m1QWHa0mg?si=yElF_UxN_ACwmoq_",
    icon: "/img/youtube_music.svg",
  },
  {
    name: "tidal",
    url: "https://tidal.com/artist/17853013",
    icon: "/img/tidal.svg",
  },
  {
    name: "apple music",
    url: "https://music.apple.com/de/artist/walls-birds/1493074404",
    icon: "/img/apple_music.svg",
  },
];
const SocialIcons = () => {
  return (
    <ul className={classes.list}>
      {items.map((item, index) => (
        <>
          <li key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img src={item.icon} alt={item.name} data-name={item.name} />
            </a>
          </li>
          {index === 2 && <li className={classes.wrapHere} />}
        </>
      ))}
    </ul>
  );
};
export default SocialIcons;
