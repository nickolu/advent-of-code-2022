import {
  buildFileSystemFromInput,
  Directory,
  FileSystemChild,
} from './FileSystem';

export default function partOne(input: string) {
  const lines = input.split('\n');

  const fileSystem = buildFileSystemFromInput(lines);

  const directoriesToSum: Directory[] = directoriesLessThanTotalSize(
    fileSystem.root,
    100000,
    []
  );

  const sumDirectories = directoriesToSum.reduce(
    (totalSize: number, directory: Directory) => {
      return totalSize + directory.size;
    },
    0
  );

  console.log(sumDirectories);
}

function directoriesLessThanTotalSize(
  directory: Directory,
  totalSize: number,
  matchingDirectories?: Directory[]
): Directory[] {
  if (directory.size < totalSize) {
    matchingDirectories.push(directory);
  }

  directory.children.forEach((fileSystemChild: FileSystemChild) => {
    if (fileSystemChild.isDirectory) {
      directoriesLessThanTotalSize(
        fileSystemChild as Directory,
        totalSize,
        matchingDirectories
      );
    }
  });

  return matchingDirectories;
}
