import React from "react";
import { Image, PlaceHolder, PlaceHolderTitle } from "./style";

type Props = {
  uri: string | null;
};

export function Photo({ uri }: Props) {
  if (uri) {
    return <Image source={{ uri }} />;
  }

  return (
    <PlaceHolder>
      <PlaceHolderTitle>No image {"\n"} loaded</PlaceHolderTitle>
    </PlaceHolder>
  );
}
