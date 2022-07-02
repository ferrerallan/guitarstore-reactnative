import React from "react";
import { TouchableOpacityProps } from "react-native";

import {
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
  StatusTypesProps,
} from "./styles";

export type OrderProps = {
  id: string;
  name: string;
  image: string;
  status: StatusTypesProps;
  table_number: string;
  quantity: string;
};

type Props = TouchableOpacityProps & {
  index: number;
  data: OrderProps;
};

export function OrderCard({ index,data, ...rest }: Props) {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri:data.image }} />
      <Name>{data.product} </Name>

      <Description>Qnt: {data.quantity}</Description>
      {
        false &&
      <StatusContainer status={data.status}>
        <StatusLabel status={data.status}>{data.status}</StatusLabel>
      </StatusContainer>
      }
    </Container>
  );
}
