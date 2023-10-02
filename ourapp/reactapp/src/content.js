import './Content.css'
export default function Content(){
    return (
    <>
        <div className="content-wrapper">
          <div className="mail-status">
            <div className="subheader">
                Bryan Center Mail Line Status
            </div>
            <div className="status-box">
                <div className="status-icon">
                    
                </div>
                <div className="status-message">
                    Long wait time
                </div>
                <div className='time-est'>
                    est 3mins
                </div>
            </div>
          </div>
        </div>
    </>

    )
}