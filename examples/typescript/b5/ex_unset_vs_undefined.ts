interface Update {
  nickname?: string | undefined;
}

function describeUpdate(update: Update): string {
  if (!("nickname" in update)) {
    return "unchanged";
  }
  if (update.nickname === undefined) {
    return "cleared";
  }
  return `set to ${update.nickname}`;
}

console.log(describeUpdate({}));
console.log(describeUpdate({ nickname: undefined }));
console.log(describeUpdate({ nickname: "Ace" }));
