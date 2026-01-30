// import { openai } from "../config/OpenAI.config.js";
import ai from "../config/gemini.config.js";

export const genrateEmailAndResume = async (req, res) => {
  let { jobDescription, resumeContent } = req.body;

  // Sanitize job description
  if (!jobDescription || typeof jobDescription !== "string") {
    return res
      .status(400)
      .json({ error: "Job description is required and must be a string" });
  }

  // Remove control characters
  jobDescription = jobDescription.replace(/[\x00-\x1F\x7F]/g, "");
  resumeContent = resumeContent.replace(/[\x00-\x1F\x7F]/g, "");

  try {
    // generate email
    const emailPrompt = `
      Given this job description: "${jobDescription}"
      And this resume: "${resumeContent}"
      Generate a professional cold email template for job application that:
      1. Shows enthusiasm for the role
      2. Highlights relevant experience from the resume
      3. Demonstrates understanding of company needs
      4. Includes a call to action
      Make it personalized and compelling.
    `;

    const emailReponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: emailPrompt,
    });

    // generate resume
    const resumePrompt = `Given this job description: "${jobDescription}"
      And this original resume: "${resumeContent}"
      Optimize the resume content by:
      1. Highlighting relevant skills and experience
      2. Using keywords from the job description
      3. Quantifying achievements where possible
      4. Removing less relevant information
      Return the optimized resume content maintaining a professional format.
    `;
    const resumeResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: resumePrompt,
    });

    // Extract generated content
    const emailContent = emailReponse.text;
    const generatedResumeContent = resumeResponse.text;

    // const resumeContent = resumeResponse.choices[0].message.content.trim();

    res.status(200).json({
      success: true,
      emailContent: emailContent,
      generatedResumeContent: generatedResumeContent,
    });
  } catch (error) {
    console.log("Analysis error : ", error);
    return res.status(500).json({
      message: "Failed to analyze job description",
      details: error.message,
    });
  }
};
