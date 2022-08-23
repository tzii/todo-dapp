/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;
use serde;

#[derive(Debug,serde::Serialize, serde::Deserialize,BorshDeserialize,BorshSerialize)]
pub struct Todo {
    id: i32,
    content: String,
    is_done: bool,
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    count: i32,
    todos: Vec<Todo>,
}

// Define the default, which automatically initializes the contract
impl Default for Contract {
    fn default() -> Self {
        Self {
            count: 0,
            todos: vec![],
        }
    }
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    // // Public method - returns the greeting saved, defaulting to DEFAULT_MESSAGE
    // pub fn get_greeting(&self) -> String {
    //     return self.message.clone();
    // }

    // // Public method - accepts a greeting, such as "howdy", and records it
    // pub fn set_greeting(&mut self, message: String) {
    //     // Use env::log to record logs permanently to the blockchain!
    //     log!("Saving greeting {}", message);
    //     self.message = message;
    // }

    // #[result_serializer(borsh)]
    pub fn todos(&self) -> &Vec<Todo>{
        &self.todos
    }

    // add todo
    // #[result_serializer(borsh)]
    pub fn add(&mut self, content: String) -> &Todo {
        self.count += 1;
        let new_todo = Todo {
            id: self.count,
            content,
            is_done: false,
        };
        self.todos.push(new_todo);
        return self.todos.last().unwrap();
    }

    // remove todo
    pub fn remove(&mut self, id: i32) -> bool {
        for (index, current_todo) in self.todos.iter().enumerate() {
            if current_todo.id == id {
                self.todos.remove(index);
                return true;
            }
        }
        return false;
    }

    pub fn update(&mut self, id: i32, content: String, is_done: bool) -> bool {
        for current_todo in self.todos.iter_mut() {
            if current_todo.id == id {
                current_todo.content = content;
                current_todo.is_done = is_done;
                return true;
            }
        }
        return false;
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_todo() {
        let mut contract = Contract::default();
        contract.add("New Todo".to_string());
        assert_eq!(
            contract.count,
            1
        );
    }
    // #[test]
    // fn set_then_get_greeting() {
    //     let mut contract = Contract::default();
    //     contract.set_greeting("howdy".to_string());
    //     assert_eq!(
    //         contract.get_greeting(),
    //         "howdy".to_string()
    //     );
    // }
}
