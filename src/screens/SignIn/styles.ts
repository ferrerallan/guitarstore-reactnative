import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
  start: { x: 0, y: 1 },
  end: { x: 0.5, y: 0.5 }
}))`
  flex: 1;
  justify-content: center;
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors : theme.COLORS.GRADIENT,
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()+ 48
  },
})`
  width: 100%;
  padding: 0 32px;
`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 24px;
  align-self: flex-start;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: 200px;
  width: 250px;
  margin-top: 64px;
  margin-bottom: 32px;
  align-items: center;
  align-self: center;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 20px;
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `};
`;