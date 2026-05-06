function NetworkErrorPage({ error, resetErrorBoundary }) {
  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>

      <button onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );
}

export default NetworkErrorPage;