import React from 'react';
import Skills from '../comp/Skills';
import { MainLayout} from '../st/Layouts';
import Resume from '../comp/Resume';

function ResumePage() {
    return (
        <MainLayout>
            <Skills />
            <Resume />
        </MainLayout>
    )
}

export default ResumePage
