import { memo } from "react";

function ErrorComponent({ error }: { error: string }) {
  return <p>{error}</p>;
}

export default memo(ErrorComponent);
