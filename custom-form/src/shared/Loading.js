
function Loading({ isLoading }) {
  return (
    <div>
     {isLoading && (
        <div className="preloader-overlay" role="status" aria-live="polite">
          <div className="preloader-card">
            <div className="preloader-spinner" aria-hidden="true" />
            <p className="preloader-text">Loading your form fields...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Loading
