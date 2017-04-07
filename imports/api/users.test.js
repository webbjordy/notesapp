import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { validateNewUser } from './users';

if(Meteor.isServer) {
  describe('users', function() {
    it('should be a valid email', function() {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      }
      const res = validateNewUser(testUser);

      expect(res).toBe(true);

    });

    it('should reject invalid email', function() {

      const testUser = {
        emails: [
          {
            address: 'testexamplecom'
          }
        ]
      }

    

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    })

  });
}



// describe('square', function() {
//   const square = (a) => a * a;
//
// it('should square a number', function() {
//   const res = square(3);
//
//   expect(res).toBe(10);
// });
//
// });
