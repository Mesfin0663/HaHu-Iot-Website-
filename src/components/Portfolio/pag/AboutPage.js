import React from 'react'
import styled from 'styled-components';
import ImageSection from '../comp/ImageSection';
import Title from '../comp/Title';
import {MainLayout} from '../st/Layouts';
import ServicesSection from '../comp/ServicesSection';
import ReviewsSection from '../comp/ReviewsSetion';

function AboutPage(props) {
    return (
        <MainLayout>
            <AboutStyled >
                <Title title={'About Me'} span={'About Me'} />
                <ImageSection uid={props.uid}  data= {props.data} />
                <ServicesSection  />
                <ReviewsSection />
            </AboutStyled >
        </MainLayout>
    )
}

const AboutStyled = styled.section`
    
`;

export default AboutPage
