import styled from 'styled-components'

export const Button = styled.button`
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 12px 18px;
  cursor: pointer;
  font-weight: bolder;
  transition-delay: 0.05s;
  transition-duration: 0.25s;

  & > * {
    vertical-align: middle;
  }

  &[data-theme='ghost'] {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    border: 1px solid #fff;
    &:hover {
      background: #fff;
      color: #333;
    }
  }

  &[data-theme='primary'] {
    background: none;
    color: #333;
    border: 1px solid #333;
    &:hover {
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
    }
  }
  &[data-theme='danger'] {
    background: #ba333e;
    color: #fff;
    &:hover {
      background: rgba(186, 51, 62, 0.9);
      color: #fff;
    }
  }
`
