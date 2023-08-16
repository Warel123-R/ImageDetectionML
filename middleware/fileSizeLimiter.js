const MB = 5; //5 MB
const FILE_SIZE_LIMIT = MB*1024*1024;
// the above means we don't want anything larger than 5MB
const fileSizeLimiter=(req, res, next)=>{
    const files = req.files;
    const filesOverLimit=[]
    //which files are over the limit?
    Object.keys(files).forEach((key)=>{
        if(files[key].size> FILE_SIZE_LIMIT){
            filesOverLimit.push(files[key].name);
        }
    })
    if(filesOverLimit.length){
        const properVerb= filesOverLimit.length >1 ? 'are': 'is';
        const sentence = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`;
        return res.status(413).json({status: "error", sentence})
    }
    next();
}
module.exports = fileSizeLimiter;