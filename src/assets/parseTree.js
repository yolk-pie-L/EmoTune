export function parseThreeLevelTree(data) {
  //data is list of objects with name and value
  //name is in format of aaa.bbb.ccc.ddd
  //construct tree, leaf nodes are object with name and value
  //non-leaf nodes are object with name and children
  //return an array of trees, root nodes are aaa
  let trees = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let nodes = element.name.split(".");
    let root = nodes[0];
    //check if root node exists
    let rootIndex = trees.findIndex((tree) => tree.name === root);
    if (rootIndex === -1) {
      //root node does not exist
      let tree = { name: root, children: [] };
      trees.push(tree);
      rootIndex = trees.length - 1;
    }
    //root node exists
    root = trees[rootIndex];

    for (let i = 1; i < 3; i++) {
      let exists = false;
    //   debugger
      if(root.children !== undefined){
      for (let j = 0; j < root.children.length; j++) {
        if (root.children[j].name === nodes[i]) {
          exists = true;
          root = root.children[j];
          break;
        }
      }
    }

      if (!exists) {
        // still at upper level
        if (i === nodes.length - 1) {
          let leaf = { name: nodes[i], value: element.value };
          root.children.push(leaf);
        } else if(i===2){
            let node = { name: nodes[i], value: element.value };
            root.children.push(node);
        } else {
          let node = { name: nodes[i], children: [] };
          root.children.push(node);
          root = node;
        }
      }if(exists && i===2 && nodes.length>3){
        root.value += element.value;
      }
    }
  }

  return trees;
}


export function parseAllTree(data){
    let trees = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let nodes = element.name.split(".");
    let root = nodes[0];
    //check if root node exists
    let rootIndex = trees.findIndex((tree) => tree.name === root);
    if (rootIndex === -1) {
      //root node does not exist
      let tree = { name: root, children: [] };
      trees.push(tree);
      rootIndex = trees.length - 1;
    }
    //root node exists
    root = trees[rootIndex];
    for (let i = 1; i < nodes.length; i++) {
      let exists = false;
    //   debugger
      if(root.children !== undefined){
      for (let j = 0; j < root.children.length; j++) {
        if (root.children[j].name === nodes[i]) {
          exists = true;
          root = root.children[j];
          break;
        }
      }
    }

      if (!exists) {
        // still at upper level
        if (i === nodes.length - 1) {
          let leaf = { name: nodes[i], value: element.value };
          root.children.push(leaf);
        } else {
          let node = { name: nodes[i], children: [] };
          root.children.push(node);
          root = node;
        }
      }
    }
  }

  return trees;
}