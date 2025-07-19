import { Helmet } from "react-helmet";

export default function HeadTag({ title = "Mentora | Learning Platform" }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content="Mentora - Your Path to Success | Learning Platform" />
    </Helmet>
  );
}
