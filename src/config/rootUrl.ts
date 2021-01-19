let url = "";
if(process.env.NODE_ENV === "development"){
  url = "http://localhost:3650"
} else {
  switch (process.env.REACT_APP_API_DOMAIN) {
      case "development": { url = "http://localhost:3650"; break; }
      case "production":  { url = "https://api.spurwing.io"; break; }
      default:            { throw new Error("invalid rootUrl config") } 
  };
}

export default url;
