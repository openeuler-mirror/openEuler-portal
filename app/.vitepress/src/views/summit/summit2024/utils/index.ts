export const getPersonTitle = (title: string) => {
  if (!title.trim()) {
    return [];
  }
  if (title.includes(';')) {
    return title.split(';');
  } else if (title.includes('；')) {
    return title.split('；');
  } else if (title.includes('\n')) {
    return title.split('\n');
  } else {
    return [title];
  }
};
