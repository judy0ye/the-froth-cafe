interface HeroContentTypes {
  title: string;
  description: string;
}

export default interface HeroTypes {
  [key: string]: HeroContentTypes;
}
