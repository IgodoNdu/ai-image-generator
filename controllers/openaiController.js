//will use openai library here
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const genimage = async (req, res) => {
    const { prompt, size } = req.body;
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    
    try {
        const response = await openai.createImage({
            //text to describe the image to be generated (input from frontend)
            //prompt: 'Eagle on Mountain Top',
            prompt: prompt,
            //number of images to be generated (input from frontend)
            n: 1,
            //image sizes (input from frontend)
            //size: '512x512'
            size: imageSize
        });
        //handling the response/reply
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.messsage)
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        });
    }
}

module.exports = { genimage };