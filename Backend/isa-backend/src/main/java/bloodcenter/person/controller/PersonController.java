package bloodcenter.person.controller;

import bloodcenter.person.dto.ChangePasswordDTO;
import bloodcenter.person.dto.PersonDTO;
import bloodcenter.person.model.Person;
import bloodcenter.person.service.PersonService;
import bloodcenter.security.filter.AuthUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/api/person")
public class PersonController {

    private final PersonService personService;
    private final AuthUtility authUtility;

    @Autowired
    public PersonController(PersonService personService){
        this.personService = personService;
        authUtility = new AuthUtility(personService);
    }

    @GetMapping("/{id}")
    public @ResponseBody PersonDTO getPersonById(@PathVariable("id") Long id) throws Person.PersonNotFoundException {
        return personService.findById(id);
    }

    @PatchMapping("password")
    public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordDTO dto) {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());

        System.out.println(dto.getOldPassword());
        System.out.println(dto.getNewPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String email = authUtility.getEmailFromRequest(request);
        if (email == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } else {
            PersonDTO personDTO = personService.getPersonDTOFromEmail(email);
            if (personDTO == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(personDTO, HttpStatus.OK);
        }
    }
}