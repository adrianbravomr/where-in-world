//React-bootstrap imports
import Spinner from "react-bootstrap/Spinner"

const WithLoading = (Component) => {

  const LoadingComponent = () => {
      return (
        <div className='loading-container'>
          <Spinner className="m-3" animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )
  }

  return(({isLoading,handleLoad,...props}) => 
    {
      // Wrapped component should have handleLoad function to set false isLoading once completed
      return (
        <div className={`${isLoading ? '' : 'overflow-auto'}`} >
          {isLoading 
          ? <LoadingComponent/> 
          : ''}
          <Component handleLoad={handleLoad} {...props}/>
        </div>
      )
    }
  )
}

export default WithLoading