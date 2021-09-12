import styled, { css } from "styled-components";
import COLORS from "../consts/colors";

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  background: transparent;
  border-radius: 3px;
  padding: 10px;
  margin: 5px;
  ${(props) =>
    props.primary &&
    css`
      background-color: ${COLORS.primary};
    `}
  ${(props) =>
    props.secondary &&
    css`
      background-color: ${COLORS.green};
    `}
    ${(props) =>
    props.danger &&
    css`
      background-color: #f40105;
    `}
    ${(props) =>
    props.large &&
    css`
      width: 125px;
    `}
    ${(props) =>
    props.medium &&
    css`
      width: 100px;
    `}
    ${(props) =>
    props.small &&
    css`
      width: 40px;
    `}
    ${(props) =>
    props.margin &&
    css`
      margin-left: 24px;
    `}
`;
// color = #62b1f6
export default StyledButton;
