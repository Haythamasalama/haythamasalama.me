/** A project's title reads "Runarks · Governed access…". Without a second part, where it was built says what it is. */
export function projectLabels (project: { title: string; context?: string }) {
  const [name, summary] = project.title.split(' · ');

  return { name: name!, summary: summary ?? project.context?.split(' · ')[0] };
}
