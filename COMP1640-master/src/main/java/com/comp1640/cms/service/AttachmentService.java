package com.comp1640.cms.service;

import com.comp1640.cms.entity.Attachment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AttachmentService {

    Attachment saveAttachment(MultipartFile file) throws Exception;


    Attachment getAttachment(String fileId) throws Exception;

    List<Attachment> getAllAttachments();
    List<Attachment> getAttachmentsByUserId(int userId);
}
