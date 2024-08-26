const SettingDisplay = ({ setting, input }) => {
    return (
        <div className="row d-flex justify-content-center align-items-center mb-3">
            <div className="d-flex col-sm-9 justify-content-start">
                {setting}
            </div>
            <div className="d-flex col-sm justify-content-sm-end justify-content-center">
                {input}
            </div>
        </div>
    );
}

export default SettingDisplay;