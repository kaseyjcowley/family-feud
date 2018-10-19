import styled, {createGlobalStyle} from 'styled-components';
import backgroundImg from '../assets/blue-background-widescreen-wallpapers-16276.jpg';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: hidden;
    margin: 0;
    background-image: url(${backgroundImg});
  }

  body {
    font-family: 'Anton', sans-serif;
  }
`;

export const Container = styled.div`
  margin: 10px 20px;
  color: white;
  text-shadow: 1px 1px 1px black;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Round = styled.div`
  font-size: 48px;
  flex: 1;
`;

export const Points = styled.div`
  font-size: 32px;
  display: flex;
  align-items: center;
`;

export const Divider = styled.div`
  height: 40px;
  width: 2px;
  margin: 0 20px;
  background-color: black;
`;

export const Question = styled.div`
  font-size: 24px;
  text-align: center;
`;

export const Strikes = styled.div`
  font-family: Arial, sans-serif;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-size: 72px;
`;

export const Strike = styled.div`
  color: ${props => (props.red ? 'red' : 'gray')};
  opacity: ${props => (props.red ? 1 : 0.3)};
  font-weight: bold;
  -webkit-text-stroke: 3px black;

  &:not(:last-child) {
    margin-right: 15px;
  }
`;

export const Board = styled.div`
  text-align: center;
`;

export const TotalPoints = styled.div`
  background-image: linear-gradient(to bottom, #0f4faf, #0079d1, #36edf7);
  border: 10px solid black;
  font-size: 72px;
  width: 175px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Panels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 110px);
  grid-gap: 10px;
  grid-auto-flow: column;
  background-color: black;
  padding: 10px;
`;

export const Panel = styled.div`
  border: 5px solid gray;
  font-size: 72px;
  transition: 0.6s;
  transform-style: preserve-3d;

  transform: ${props => (props.flipped ? 'rotateX(180deg)' : 'none')};
`;

Panel.Face = styled.div`
  position: absolute;
  backface-visibility: hidden;
  background-image: linear-gradient(to top, #0f4faf, #0079d1, #36edf7);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

Panel.Front = styled(Panel.Face)``;

Panel.Back = styled(Panel.Face)`
  transform: rotateX(180deg);
  font-size: 36px;
  display: flex;
`;

Panel.Answer = styled.div`
  flex: 1;
`;

Panel.Points = styled.div`
  background-image: linear-gradient(to bottom, #0f4faf, #0079d1, #36edf7);
  flex-basis: 20%;
  font-size: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid lightblue;
  box-sizing: border-box;
`;
