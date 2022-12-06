const MARKER_SEQUENCE_LENGTH = 4;

export default function partOne(
  datastreamBuffer: string,
  markerSequenceLength = MARKER_SEQUENCE_LENGTH
) {
  let sequenceMarkerPosition = 0;
  let i = 0;

  while (sequenceMarkerPosition === 0) {
    const startPosition = i;
    const endPosition = i + markerSequenceLength;

    if (!datastreamBuffer[endPosition]) {
      console.log('no marker found');
      return;
    }

    if (
      isSequenceAStartOfPacketMarker(
        datastreamBuffer.substring(startPosition, endPosition)
      )
    ) {
      sequenceMarkerPosition = i;
      console.log(sequenceMarkerPosition + markerSequenceLength);
      console.log(datastreamBuffer.substring(startPosition, endPosition));
    }
    i++;
  }
}

function isSequenceAStartOfPacketMarker(datastreamBuffer: string) {
  const counted = {};

  for (let i = 0; i < datastreamBuffer.length; i++) {
    if (counted[datastreamBuffer[i]]) {
      return false;
    }

    counted[datastreamBuffer[i]] = 1;
  }

  return true;
}
