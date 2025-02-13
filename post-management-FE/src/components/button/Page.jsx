
import PropTypes from "prop-types";

const Page = ({ text = '', classes = '', type = '', disabled, isLoading }) => {
   return (
      <div>
         <button disabled={disabled} type={type} className={classes}>
            {isLoading ? <span className="loading loading-spinner"></span> :  text }

         </button>
      </div>
   )
}

Page.propTypes = {
   classes: PropTypes.string,
   text: PropTypes.string,
   type: PropTypes.string,
   disabled: PropTypes.boolean,
   isLoading: PropTypes.boolean,
};

export default Page