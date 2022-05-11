import { StyledSection, Container } from './Section.styled';
import PropeTypes from 'prop-types';

const Section = ({ children }) => {
  return (
    <StyledSection>
      <Container>
        {children}
      </Container>
    </StyledSection>
  );
};

Section.propTypes = {
  children: PropeTypes.arrayOf(PropeTypes.element),
  title: PropeTypes.string
}

export default Section;
