import React from 'react';

const ControlPad = ({ onClick }) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="mt-5">
                <div className='d-flex justify-content-center'>
                    <button className="btn btn-secondary btn-lg" onClick={() => onClick(38)}>&#8593;</button>
                </div>
                <div className='mt-2'>
                    <button className="btn btn-secondary btn-lg" onClick={() => onClick(37)}>&#8592;</button>
                    <button className="btn btn-secondary btn-lg mx-2" onClick={() => onClick(40)}>&#8595;</button>
                    <button className="btn btn-secondary btn-lg" onClick={() => onClick(39)}>&#8594;</button>
                </div>
            </div>
        </div>
    );
}

export default ControlPad;
