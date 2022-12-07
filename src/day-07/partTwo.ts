import {
  buildFileSystemFromInput,
  Directory,
  FileSystemChild,
} from './FileSystem';

export default function partTwo(input: string) {
  const lines = input.split('\n');
  const fileSystem = buildFileSystemFromInput(lines);
  const requiredDiskSpace = 30000000;
  const spaceNeeded = requiredDiskSpace - fileSystem.remainingDiskSpace();
  const eligibleDirectories = [];

  findDirectoriesThatWouldFreeUpEnoughSpace(
    fileSystem.root,
    spaceNeeded,
    eligibleDirectories
  );

  eligibleDirectories.sort((a, b) => a.size - b.size);

  const smallestEligible = eligibleDirectories[0];
  console.log(smallestEligible.size);
}

function findDirectoriesThatWouldFreeUpEnoughSpace(
  directory: Directory,
  spaceNeeded: number,
  foundDirectories: Directory[]
) {
  if (directory.size >= spaceNeeded) {
    foundDirectories.push(directory);
  }

  directory.children.forEach((child: FileSystemChild) => {
    if (child.isDirectory) {
      child = child as Directory;
      findDirectoriesThatWouldFreeUpEnoughSpace(
        child,
        spaceNeeded,
        foundDirectories
      );
    }
  });
}
