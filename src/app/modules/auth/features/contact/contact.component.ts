import { Component, OnInit } from '@angular/core';
import { ContactViewDto } from '../../../../common/dtos/contact-view-dto';
import { ContactService } from '../../../../common/services/contact.service';
import { ContactCreateDto } from '../../../../common/dtos/contact-create-dto';
import { ContactUpdateDto } from '../../../../common/dtos/contact-update-dto';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: ContactCreateDto = {
    name: '',
    phonenUmber: '',
    userId: '',
  };

  contacts: ContactViewDto[] = [];
  selectedContactId: number | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getAll().subscribe((res) => {
      if (res.success) this.contacts = res.data;
    });
  }

  onSubmit(): void {
    if (this.selectedContactId) {
      const updateDto: ContactUpdateDto = {
        name: this.contactForm.name,
        phoneNumber: this.contactForm.phonenUmber,
      };
      this.contactService
        .update(this.selectedContactId, updateDto)
        .subscribe(() => this.resetFormAndReload());
    } else {
      this.contactService.create(this.contactForm).subscribe(() => this.resetFormAndReload());
    }
  }

  editContact(contact: ContactViewDto): void {
    this.selectedContactId = contact.id;
    this.contactForm = {
      name: contact.name,
      phonenUmber: contact.phoneNumber,
      userId: contact.userId,
    };
  }

  deleteContact(id: number): void {
    this.contactService.delete(id).subscribe(() => this.loadContacts());
  }

  resetFormAndReload(): void {
    this.contactForm = { name: '', phonenUmber: '', userId: '' };
    this.selectedContactId = null;
    this.loadContacts();
  }
}
