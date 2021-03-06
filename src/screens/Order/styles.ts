import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 34}px 0 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  text-align: center;
  margin-bottom: 32px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Photo = styled.Image`
  width: 240px;
  height: 240px;
  border-radius: 120px;
  align-self: center;
  position: relative;
  top: -120px;
`;

export const Sizes = styled.View`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:40px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: -120px;
  padding: 24px;
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Price = styled.Text`
  font-size: 14px;
  text-align: center;
  align-self: flex-end;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const FormRow = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const InputGroup = styled.View`  
  width: 48%;
`;

