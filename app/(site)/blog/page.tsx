import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog sedang dalam pengembangan.",
  robots: {
    index: false,
    follow: false
  }
};

const page = () => {
  return (
    <main>
      <h1>Blog Coming Soon</h1>
    </main>
  );
};

export default page;
